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

  rawPackageLock = builtins.fromJSON (builtins.readFile ./package-lock.json);

  isBundledDependency = path: depName:
    let
      depPath =
        if path == ""
        then "node_modules/${depName}"
        else "${path}/node_modules/${depName}";
    in
      builtins.hasAttr depPath rawPackageLock.packages
      && ((builtins.getAttr depPath rawPackageLock.packages).inBundle or false);

  stripBundledDeps = path: entry:
    builtins.foldl'
      (acc: depKey:
        if builtins.hasAttr depKey entry
        then
          acc
          // {
            ${depKey} = lib.filterAttrs (depName: _: !(isBundledDependency path depName))
              (builtins.getAttr depKey entry);
          }
        else acc)
      entry
      [ "dependencies" "devDependencies" "optionalDependencies" ];

  sanitizedPackageLock =
    rawPackageLock
    // {
      packages = lib.pipe rawPackageLock.packages [
        (lib.mapAttrs stripBundledDeps)
        (lib.filterAttrs (_: entry: !(entry.inBundle or false)))
      ];
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
    packageLock = sanitizedPackageLock;
  };
  nodejs-granular-v3 = {
    runBuild = false;
  };

  name = "kuki-frontend";
  version = "0.1.0";
}
