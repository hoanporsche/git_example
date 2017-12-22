package ds.config;

import ds.model.Role;
import ds.model.Store;
import ds.model.User;
import ds.repository.RoleRepository;
import ds.repository.StoreRepository;
import ds.repository.UserRepository;
import ds.util.Constant;

import java.util.Date;
import java.util.HashSet;

import org.apache.commons.lang3.RandomStringUtils;
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
  
  @Autowired
  private StoreRepository storeRepository;

  @Override
  public void onApplicationEvent(ContextRefreshedEvent arg0) {
    // Roles
    if (roleRepository.findByroleName("ROLE_ADMIN") == null) {
      roleRepository.save(new Role("ROLE_ADMIN", 
          RandomStringUtils.random(10, Constant.RANDOM_STRING)));
    }

    if (roleRepository.findByroleName("ROLE_MEMBER") == null) {
      roleRepository.save(new Role("ROLE_MEMBER",
          RandomStringUtils.random(10, Constant.RANDOM_STRING)));
    }

    // Admin account
    if (userRepository.findByuserEmail("admin@gmail.com") == null) {
      User admin = new User(new Date(), new Date());
      admin.setUserEmail("admin@gmail.com");
      admin.setUserPassword(passwordEncoder.encode("123456"));
      admin.setUserName("hoan");
      admin.setUserStatus(true);
      admin.setUserPhoneNumber("094 345 1794");
      Store store = new Store("Giảng Võ", new Date(), new Date(), true);
      store.setStoreAddress("113 D6 Trần Huy Liệu");
      store.setStorePhoneNumber("094 345 1794");
      store.setStoreCode(RandomStringUtils.random(10, Constant.RANDOM_STRING));
      storeRepository.save(store);
      HashSet<Role> roles = new HashSet<>();
      roles.add(roleRepository.findByroleName("ROLE_ADMIN"));
      roles.add(roleRepository.findByroleName("ROLE_MEMBER"));
      admin.setRoles(roles);
      admin.setUserStore(storeRepository.findBystoreName("Giảng Võ"));
      userRepository.save(admin);
    }

    // Member account
    if (userRepository.findByuserEmail("member@gmail.com") == null) {
      User user = new User(new Date(), new Date());
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
