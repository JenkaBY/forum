import { User } from '../../model/user';

/**
 * Service for User
 */
interface IUserService {
    /**
     * Get all existing users
     * @returns {Promise<User[]>}
     * @see User
     */
    getAllUsers(): Promise<User[]>;

    /**
     * Get user by id
     * @returns {Promise<User>}
     * @see User
     */
    getById(id: number): Promise<User>;

    /**
     * Delete user by id
     */
    deleteById(id: number): void;

    /**
     * Update user by id. Uses PUT http verb
     * @returns {Promise<User>}
     * @see User
     */
    update(user: User): Promise<User>;

    /**
     * Update user by id. Uses POST http verb
     * @returns {Promise<User>}
     * @see User
     */
    create(user: User): Promise<User>;
}
export default IUserService;
