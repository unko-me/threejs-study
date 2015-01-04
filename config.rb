###
# Compass
###

# Susy grids in Compass
# First: gem install susy --pre
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Slim settings
# Set slim-lang output style
Slim::Engine.set_options :pretty => true
# Set Shortcut
Slim::Engine.set_options :shortcut => {
  '#' => {:tag => 'div', :attr => 'id'},
  '.' => {:tag => 'div', :attr => 'class'},
  '&' => {:tag => 'input', :attr => 'type'}
}


def my_address
  udp = UDPSocket.new
  # クラスBの先頭アドレス,echoポート 実際にはパケットは送信されない。
  udp.connect("128.0.0.0", 7)
  adrs = Socket.unpack_sockaddr_in(udp.getsockname)[1]
  udp.close
  adrs
end


# bower.js settings
ready do
  sprockets.append_path File.join root.to_s, "bower_components"
  # sprockets.append_path "#{root}/bower_components"


  # open
  url = "http://#{my_address}:4567/"
  command = "open -a \"Google Chrome Canary\" #{url}"
  puts "url: #{url}"
  puts "command: #{command}"

  system command
end

# activate :directory_indexes
#
# activate :gzip

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# set file names
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'

# livereload your browser, Firefox/Google Chrome/Safari
activate :livereload

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :cache_buster

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  set :http_path, "/three-study/"

end

# Deploy-specific configuration
activate :deploy do |deploy|
  deploy.build_before = true
  deploy.method = :git
end
