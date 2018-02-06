package by.intexsoft.forum.service.impl.helper.role;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.entity.Role;

public class RoleTestHelper {
    public static final Role ADMIN;
    public static final Role USER;
    public static final Role MANAGER;
    public static final Role SYSTEM;

    static {
        ADMIN = new Role();
        ADMIN.title = RoleConst.ADMIN;
        ADMIN.setId(1);

        USER = new Role();
        USER.title = RoleConst.USER;
        USER.setId(2);

        MANAGER = new Role();
        MANAGER.title = RoleConst.MANAGER;
        MANAGER.setId(3);

        SYSTEM = new Role();
        SYSTEM.title = RoleConst.SYSTEM;
        SYSTEM.setId(4);
    }
}
