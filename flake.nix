{
  description = "Next.js + Hono with dream2nix (full Nix management)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    dream2nix.url = "github:nix-community/dream2nix";
    dream2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs @ { self, nixpkgs, dream2nix }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      # ===== パッケージ定義 =====
      packages = forAllSystems (system: {
        # Frontend (Next.js)
        frontend = dream2nix.lib.evalModules {
          packageSets.nixpkgs = nixpkgs.legacyPackages.${system};
          modules = [
            ./frontend/default.nix
            {
              paths.projectRoot = ./.;
              paths.projectRootFile = "flake.nix";
              paths.package = ./frontend;
            }
          ];
        };

        # Backend (Hono)
        backend = dream2nix.lib.evalModules {
          packageSets.nixpkgs = nixpkgs.legacyPackages.${system};
          modules = [
            ./backend/default.nix
            {
              paths.projectRoot = ./.;
              paths.projectRootFile = "flake.nix";
              paths.package = ./backend;
            }
          ];
        };

        default = self.packages.${system}.frontend;
      });

      # ===== 開発シェル =====
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          frontend = self.packages.${system}.frontend;
          backend = self.packages.${system}.backend;
        in
        {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs_20
              git
              gh
              jq
            ];

            shellHook = ''
              frontend_node_modules_target="${frontend}/lib/node_modules/kuki-frontend/node_modules"
              backend_node_modules_target="${backend}/lib/node_modules/kuki-backend/node_modules"
              export PATH="${frontend}/lib/node_modules/.bin:${backend}/lib/node_modules/.bin:$PATH"

              echo "═══════════════════════════════════════"
              echo "  🚀 Next.js + Hono 開発環境 (dream2nix)"
              echo "═══════════════════════════════════════"
              echo "  Node:   $(node --version)"
              echo "  npm:    $(npm --version)"
              echo "═══════════════════════════════════════"

              # frontend/node_modules を Nix Store からリンク
              if [ -d frontend ] && [ "$(readlink frontend/node_modules 2>/dev/null)" != "$frontend_node_modules_target" ]; then
                rm -rf frontend/node_modules
                ln -sf "$frontend_node_modules_target" frontend/node_modules
                echo "✅ frontend/node_modules を Nix Store にリンクしました"
              fi

              # backend/node_modules を Nix Store からリンク
              if [ -d backend ] && [ "$(readlink backend/node_modules 2>/dev/null)" != "$backend_node_modules_target" ]; then
                rm -rf backend/node_modules
                ln -sf "$backend_node_modules_target" backend/node_modules
                echo "✅ backend/node_modules を Nix Store にリンクしました"
              fi

              echo ""
              echo "📍 起動コマンド:"
              echo "   Frontend: cd frontend && npm run dev   (http://localhost:3000)"
              echo "   Backend:  cd backend && npm run dev    (http://localhost:8787)"
              echo ""
            '';
          };
        });
    };
}
