package DS.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DS.model.User;
import DS.repository.UserRepository;
import DS.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public void save(User user) {
		userRepository.save(user);
	}

	@Override
	public void delete(int id) {
		userRepository.delete(id);
	}

	@Override
	public User findOne(int id) {
		return userRepository.findOne(id);
	}
	
	
}
