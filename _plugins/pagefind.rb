Jekyll::Hooks.register :site, :post_write do |site|
  system("npx --yes pagefind@v1.0.0-alpha.4 --source '#{site.dest}'")
end