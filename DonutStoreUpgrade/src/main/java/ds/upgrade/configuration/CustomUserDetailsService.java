package ds.upgrade.configuration;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ds.upgrade.model.Role;
import ds.upgrade.model.User;
import ds.upgrade.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Autowired
  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    User user = userRepository.findByUserEmail(email);

    if (user == null) {
      // Not found...
      throw new UsernameNotFoundException("User's email " + email + " not found.");
    }

    if (user.getRoles() == null || user.getRoles().isEmpty()) {
      // No Roles assigned to user...
      throw new UsernameNotFoundException("User not authorized.");
    }

    Collection<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
    for (Role role : user.getRoles()) {
      grantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleName()));
    }

    org.springframework.security.core.userdetails.User userDetails = new 
        org.springframework.security.core.userdetails.User(
        user.getUserEmail(), user.getUserPassword(), user.isEnabled(), !user.isExpired(),
        !user.isCredentialsexpired(), !user.isLocked(), grantedAuthorities);

    return userDetails;
  }

}
