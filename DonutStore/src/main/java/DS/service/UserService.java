package DS.service;

import DS.model.User;

public interface UserService {
	Iterable<User> findAll();
	void save(User user);
	void delete(int id);
	User findOne(int id);
}
