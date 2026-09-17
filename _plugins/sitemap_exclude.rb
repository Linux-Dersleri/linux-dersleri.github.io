Jekyll::Hooks.register :site, :post_read do |site|
  site.pages.each do |page|
    next unless page.data['robots']&.include?('noindex')

    page.data['sitemap'] = false
  end

  site.collections.each_value do |collection|
    collection.docs.each do |doc|
      next unless doc.data['robots']&.include?('noindex')

      doc.data['sitemap'] = false
    end
  end
end
