package ds.service.impl;

import ds.model.Role;
import ds.model.User;
import ds.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByuserEmail(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
    Set<Role> roles = user.getRoles();
    for (Role role : roles) {
      grantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleName()));
    }

    return new org.springframework.security.core.userdetails.User(user.getUserEmail(),
        user.getUserPassword(), grantedAuthorities);
  }

}
