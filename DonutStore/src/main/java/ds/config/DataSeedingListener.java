package ds.config;

import ds.model.Role;
import ds.model.User;
import ds.repository.RoleRepository;
import ds.repository.UserRepository;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;



@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void onApplicationEvent(ContextRefreshedEvent arg0) {
    // Roles
    if (roleRepository.findByroleName("ROLE_ADMIN") == null) {
      roleRepository.save(new Role("ROLE_ADMIN"));
    }

    if (roleRepository.findByroleName("ROLE_MEMBER") == null) {
      roleRepository.save(new Role("ROLE_MEMBER"));
    }

    // Admin account
    if (userRepository.findByuserEmail("admin@gmail.com") == null) {
      User admin = new User();
      admin.setUserEmail("admin@gmail.com");
      admin.setUserPassword(passwordEncoder.encode("123456"));
      admin.setUserName("hoan");
      admin.setUserStatus(true);
      HashSet<Role> roles = new HashSet<>();
      roles.add(roleRepository.findByroleName("ROLE_ADMIN"));
      roles.add(roleRepository.findByroleName("ROLE_MEMBER"));
      admin.setRoles(roles);
      userRepository.save(admin);
    }

    // Member account
    if (userRepository.findByuserEmail("member@gmail.com") == null) {
      User user = new User();
      user.setUserEmail("member@gmail.com");
      user.setUserPassword(passwordEncoder.encode("123456"));
      user.setUserName("Somebody");
      user.setUserStatus(true);
      HashSet<Role> roles = new HashSet<>();
      roles.add(roleRepository.findByroleName("ROLE_MEMBER"));
      user.setRoles(roles);
      userRepository.save(user);
    }
  }

}
