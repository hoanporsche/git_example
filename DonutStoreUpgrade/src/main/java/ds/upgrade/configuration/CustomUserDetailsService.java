package ds.upgrade.configuration;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

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
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    User user = userRepository.findByuserEmail(email);

    if (user == null) {
      // Not found...
      throw new UsernameNotFoundException("User's email " + email + " not found.");
    }

    if (user.getRoles() == null || user.getRoles().isEmpty()) {
      // No Roles assigned to user...
      throw new UsernameNotFoundException("User not authorized.");
    }

    Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
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
