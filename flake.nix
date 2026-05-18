{
  description = "Next.js + Hono 開発環境 (bun)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs_20
              bun
              git
              gh
              jq
            ];

            shellHook = ''
              echo "═══════════════════════════════════════"
              echo "  🚀 Next.js + Hono 開発環境 (bun)"
              echo "═══════════════════════════════════════"
              echo "  Node:   $(node --version)"
              echo "  Bun:    $(bun --version)"
              echo "═══════════════════════════════════════"
              echo ""
              echo "📦 初回セットアップ:"
              echo "   cd frontend && bun install"
              echo "   cd backend  && bun install"
              echo ""
              echo "📍 起動コマンド:"
              echo "   Frontend:      cd frontend && bun run dev   (http://localhost:3000)"
              echo "   Frontend test: cd frontend && bun test"
              echo "   Backend:       cd backend  && bun run dev   (http://localhost:8787)"
              echo ""
            '';
          };
        });
    };
}
