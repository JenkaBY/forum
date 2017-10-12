import { User } from '../../model/user';
import { Page } from '../../common/Page';

/**
 * Service for AdminDashboard
 */
export interface IAdminService {
    /**
     * Get all existing users
     * @returns {Promise<Page<User>>}
     * @see User
     */
    getAllUsers(urlParams?: URLSearchParams): Promise<Page<User>>;

    /**
     * Get all pending to approve users (/admin/user/pending)
     * @returns {Promise<Page<User>>}
     * @see User
     */
    getAllUsersPendingToApprove(urlParams?: URLSearchParams): Promise<Page<User>>;

    /**
     * Get all approved users by admin (/admin/user/approved)
     * @returns {Promise<Page<User>>}
     */
    getUsersApprovedByMe(urlParams?: URLSearchParams): Promise<Page<User>>;

    /**
     * Get users rejected by admin. (/admin/user/rejected)
     * @returns {Promise<Page<User>>}
     * @see User
     */
    getUsersRejectedByMe(urlParams?: URLSearchParams): Promise<Page<User>>;

    /**
     * Get all blocked users (/admin/user/blocked)
     * @returns {Promise<Page<User>>}
     * @see User
     */
    getAllBlockedUsers(urlParams?: URLSearchParams): Promise<Page<User>>;
}

// export default IAdminService;
