<?php
/*
Plugin Name: Youtube Playlist Cinema
Description: Awesome, Responsive, Custom, and fast Youtube Playlist on your site. Very easy to use.
Version: 1.0
Author: Loi Truong
Author URI: http://loitruong.us
*/
if (!class_exists('YPC_Plugin'))
{
  class YPC_Plugin
  {

    public function __construct()
    {
      add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
      add_action( 'admin_init', array( $this, 'page_init' ) );
      add_shortcode( 'Youtube_Playlist_Cinema', array($this, 'YPC') );
      if(!is_admin()){
        add_action( 'wp_enqueue_scripts', array($this, 'ypc_scripts' ) );
      }
    }
    public function YPC(){
          $this->options = get_option( 'my_option_name' );
          $apikey = $this->options['youtube_api_key'];
          $playlist = $this->options['youtube_playlist_id'];
          $name = $this->options['youtube_playlist_name'];
          return '
          <div id="youtube-playlist-cinema" api-key="'. $apikey .'" playlistId="'. $playlist . '">
            <div class="playlist-trigger">
             '. $name .'
            </div>
          </div>';
    }
    /**
      * Add options page
      */
     public function add_plugin_page()
     {
         // This page will be under "Settings"
         add_menu_page(
             'YPC Setting', 
             'YPC Setting', 
             'manage_options', 
             'ypc-setting',
             array($this, 'create_admin_page')
             //icon
             //position
         );
     }
     function ypc_scripts() {
        wp_enqueue_style( 'YPC-css', plugins_url( 'css/YPCStyle.min.css', __FILE__ ), array(), null);
        wp_enqueue_style( 'font-awesome-css', '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css', array(), null);
        wp_enqueue_script( 'jQuery', '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js',array(), null,true);
        wp_enqueue_script( 'YoutubePlaylistDisplay', plugins_url( 'js/YoutubePlaylistDisplay.js', __FILE__ ),array(), null,true); 

     }
     
     /**
      * Options page callback
      */
     public function create_admin_page()
     {
      // Set class property
      $this->options = get_option( 'my_option_name' );
      ?>
      <div class="wrap">
          <h2>Youtube Playlist Cinema - Playlist</h2>           
          <form method="post" action="options.php">
          <?php
              // This prints out all hidden setting fields
              settings_fields( 'my_option_group' );   
              do_settings_sections( 'my-setting-admin' );
              submit_button(); 
          ?>
          </form>
      </div>
      <div>
      1) get <a href="https://console.developers.google.com/project" target="_blank">youtube API key</a><br>
      2) get Youtube <a target="_blank" href="https://www.youtube.com/watch?v=oRGEOtcZc0o">Playlist's ID</a><br>
      3) put this short code in your visual text editor 
        <xmp style="color: white; max-width: 100%; background: black; width: 500px;">
  [Youtube_Playlist_Cinema]
        </xmp>
        <div class="company">
          
        </div>
      </div>
      <?php
     }

    /**
     * Register and add settings
     */
    public function page_init()
    {        
        register_setting(
            'my_option_group', // Option group
            'my_option_name', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'setting_section_id', // ID
            'Custom Settings', // Title
            array( $this, 'print_section_info' ), // Callback
            'my-setting-admin' // Page
        );  

        add_settings_field(
            'youtube_api_key', // ID
            'Youtube API Key', // Title 
            array( $this, 'youtube_api_key_callback' ), // Callback
            'my-setting-admin', // Page
            'setting_section_id' // Section           
        );      

        add_settings_field(
            'youtube_playlist_id', 
            'Youtube Playlist ID', 
            array( $this, 'youtube_playlist_id_callback' ), 
            'my-setting-admin', 
            'setting_section_id'
        );
        add_settings_field(
            'youtube_playlist_name', 
            'Youtube Playlist Name', 
            array( $this, 'youtube_playlist_name_callback' ), 
            'my-setting-admin', 
            'setting_section_id'
        );        
    }
    /**
        * Sanitize each setting field as needed
        *
        * @param array $input Contains all settings fields as array keys
        */
       public function sanitize( $input )
       {
           $new_input = array();
           if( isset( $input['youtube_api_key'] ) )
               $new_input['youtube_api_key'] = sanitize_text_field( $input['youtube_api_key'] );

           if( isset( $input['youtube_playlist_id'] ) )
               $new_input['youtube_playlist_id'] = sanitize_text_field( $input['youtube_playlist_id'] );

            if( isset( $input['youtube_playlist_name'] ) )
                $new_input['youtube_playlist_name'] = sanitize_text_field( $input['youtube_playlist_name'] );

           return $new_input;
       }

       /** 
        * Print the Section text
        */
       public function print_section_info()
       {
          // print 'Enter your settings below:';
       }

       /** 
        * Get the settings option array and print one of its values
        */
       public function youtube_api_key_callback()
       {
           printf(
               '<input type="text" id="youtube_api_key" name="my_option_name[youtube_api_key]" value="%s" />',
               isset( $this->options['youtube_api_key'] ) ? esc_attr( $this->options['youtube_api_key']) : ''
           );
       }

       /** 
        * Get the settings option array and print one of its values
        */
       public function youtube_playlist_id_callback()
       {
           printf(
               '<input type="text" id="youtube_playlist_id" name="my_option_name[youtube_playlist_id]" value="%s" />',
               isset( $this->options['youtube_playlist_id'] ) ? esc_attr( $this->options['youtube_playlist_id']) : ''
           );
       }
       /** 
        * Get the settings option array and print one of its values
        */
       public function youtube_playlist_name_callback()
       {
           printf(
               '<input type="text" id="youtube_playlist_name" name="my_option_name[youtube_playlist_name]" value="%s" />',
               isset( $this->options['youtube_playlist_name'] ) ? esc_attr( $this->options['youtube_playlist_name']) : ''
           );
       }

   }

}
$YPC_Plugin = new YPC_Plugin();