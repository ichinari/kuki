{ config, lib, dream2nix, ... }:

let
  src = lib.cleanSourceWith {
    src = ./.;
    filter = path: type:
      let
        base = builtins.baseNameOf path;
      in
        !(builtins.elem base [ "node_modules" ".next" "dist" ]);
  };
in

{
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-lock-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

  mkDerivation = {
    inherit src;
  };

  deps = { nixpkgs, ... }: {
    inherit (nixpkgs)
      stdenv
      ;
    nodejs = nixpkgs.nodejs_20 // {
      src = nixpkgs.runCommandLocal "node-v${nixpkgs.nodejs_20.version}.tar" {} ''
        src_dir="${nixpkgs.srcOnly nixpkgs.nodejs_20}"
        workdir="$(mktemp -d)"
        mkdir -p "$workdir/node-v${nixpkgs.nodejs_20.version}"
        cp -R "$src_dir"/. "$workdir/node-v${nixpkgs.nodejs_20.version}"/
        chmod -R u+w "$workdir/node-v${nixpkgs.nodejs_20.version}"
        tar -C "$workdir" -cf "$out" "node-v${nixpkgs.nodejs_20.version}"
      '';
    };
  };

  # package-lock.json のパスを明示的に指定
  nodejs-package-lock-v3 = {
    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
  };
  nodejs-granular-v3 = {
    runBuild = false;
  };

  name = "kuki-backend";
  version = "0.1.0";
}
