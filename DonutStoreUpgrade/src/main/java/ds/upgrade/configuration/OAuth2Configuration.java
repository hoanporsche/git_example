package ds.upgrade.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

@Configuration
public class OAuth2Configuration {

  private static final String RESOURCE_ID = "restservice";
  
  @Configuration
  @EnableResourceServer
  protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    @Autowired
    private TokenStore tokenStore;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
      // @formatter:off
      resources.resourceId(RESOURCE_ID).tokenStore(tokenStore);
      // @formatter:on
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
      http
      .csrf().disable()
      .anonymous().disable()
      .requestMatcher(request -> {
        String auth = request.getHeader("Authorization");
        // Determine if the client request contained an OAuth Authorization
        return (auth != null) && auth.startsWith("Bearer");
      })
        .antMatcher("/api/**")
        .authorizeRequests()
        .antMatchers("/api/**").authenticated()
        .and()
      .exceptionHandling()
        .accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }
  }

  @Configuration
  @EnableAuthorizationServer
  protected static class AuthorizationServerConfiguration
      extends AuthorizationServerConfigurerAdapter {

    static final String CLIENT_ID = "demo-clientid";
    static final String CLIENT_SECRET = "demo-secret";
    static final String GRANT_TYPE = "password";
    static final String REFRESH_TOKEN = "refresh_token";
    static final String SCOPE_READ = "read";
    static final String SCOPE_WRITE = "write";
    
    @Autowired
    private JwtAccessTokenConverter jwtAccessTokenConverter;

    @Autowired
    private TokenStore tokenStore;

    @Autowired
    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager;

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
      // @formatter:off
      endpoints
        .tokenStore(tokenStore)
        .authenticationManager(authenticationManager)
        .accessTokenConverter(jwtAccessTokenConverter)
        .userDetailsService(userDetailsService);
      // @formatter:on
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
      // @formatter:off
      clients
        .inMemory()
          .withClient(CLIENT_ID).secret(CLIENT_SECRET)
          .authorizedGrantTypes(GRANT_TYPE, REFRESH_TOKEN)
          .authorities("USER")
          .scopes(SCOPE_READ, SCOPE_WRITE)
          .resourceIds(RESOURCE_ID);
      // @formatter:on
    }

  }
}
