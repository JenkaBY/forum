import { User } from '../../model/user';

/**
 * Interface for Manager Dashboard
 */
interface IManagerService {
    /**
     * Get all existing users
     * @returns {Promise<User[]>}
     * @see User
     */
    getAllUsers(): Promise<User[]>;

    /**
     * Get all pending to approve users (/admin/user/pending)
     * @returns {Promise<User[]>}
     * @see User
     */
    getAllUsersPendingToApprove(): Promise<User[]>;

    /**
     * Get all approved users by admin (/admin/user/approved)
     * @returns {Promise<User[]>}
     */
    getUsersApprovedByMe(): Promise<User[]>;

    /**
     * Get users rejected by admin. (/admin/user/rejected)
     * @returns {Promise<User[]>}
     * @see User
     */
    getUsersRejectedByMe(): Promise<User[]>;

    /**
     * Get all blocked users (/admin/user/blocked)
     * @returns {Promise<User[]>}
     * @see User
     */
    getAllBlockedUsers(): Promise<User[]>;
}

export default IManagerService;
