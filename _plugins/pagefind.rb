Jekyll::Hooks.register :site, :post_write do |site|
  system("pagefind@v1.0.0-alpha.4 --source '_site'" % {:path => site.dest})
end