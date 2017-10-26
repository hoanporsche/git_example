package DS.repository;

import org.springframework.data.repository.CrudRepository;

import DS.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByuserName(String userName);

}
