package by.intexsoft.userfaces;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import by.intexsoft.userfaces.model.AbstractEntity;
import by.intexsoft.userfaces.model.Community;
import by.intexsoft.userfaces.model.PhoneNumber;
import by.intexsoft.userfaces.model.PhoneType;
import by.intexsoft.userfaces.model.User;
import by.intexsoft.userfaces.service.AbstractEntityService;
import by.intexsoft.userfaces.service.CommunityService;
import by.intexsoft.userfaces.service.PhoneNumberService;
import by.intexsoft.userfaces.service.PhoneTypeService;
import by.intexsoft.userfaces.service.UserService;
import ch.qos.logback.classic.Logger;

public class MainRunner {
	static Logger logger = (Logger) LoggerFactory.getLogger("com.hibernate.data");

	public static void main(String[] args) {
		printClassPath();
		// String destination = ".\\dist\\lib\\";
		// copyFiles(getClassPathUrls(), destination);
		String target = ".\\lib\\";
		System.out.println(getClassPathesForMinifest(getClassPathUrls(), target));
		logger.error("THIS IS NOT AN ERROR. IT'S ONLY TEST LOG MESSAGE.");
		logger.info("Start application.");

		ApplicationContext context = new ClassPathXmlApplicationContext("application-context.xml");
		// Arrays.asList(context.getBeanDefinitionNames()).forEach(bean ->
		// System.out.println(bean));

		PhoneTypeService phoneTypeService = context.getBean(PhoneTypeService.class);
		UserService userService = context.getBean(UserService.class);
		PhoneNumberService phoneNumberService = context.getBean(PhoneNumberService.class);
		CommunityService communityService = context.getBean(CommunityService.class);

		List<PhoneType> phoneTypes = getPhoneTypes();
		saveEntities(phoneTypeService, phoneTypes);

		List<User> users = getUsers();
		saveEntities(userService, users);

		List<PhoneNumber> phoneNumbers = createPhoneNumbers(phoneTypes, users);
		saveEntities(phoneNumberService, phoneNumbers);

		List<Community> communities = createCommunities(users);
		saveEntities(communityService, communities);

		printCommunities(communityService, communities);

		communityService.delete((communities.get(communities.size() - 1)).getId());

		System.out.println("After delete");
		printCommunities(communityService, communities);

		User userFoundByEmail = userService.findByEmail("deleted");
		System.out.println("USER found by Email: " + userFoundByEmail);

		User userById = userService.find(userFoundByEmail.getId());
		System.out.println("USER found by id: " + userById);
		System.out.println("Are users equal? " + (userById.equals(userFoundByEmail)));

		((ClassPathXmlApplicationContext) context).close();
		System.out.println("Context closed.");
	}

	public static void printClassPath() {
		URL[] urls = getClassPathUrls();

		for (URL url : urls) {
			System.out.println(url.getPath());
		}

	}

	public static URL[] getClassPathUrls() {
		ClassLoader cl = ClassLoader.getSystemClassLoader();

		return ((URLClassLoader) cl).getURLs();
	}

	public static String getClassPathesForMinifest(URL[] jarFiles, String destination) {
		String classPathProp = "Class-Path:";
		StringBuilder sb = new StringBuilder(classPathProp);

		Arrays.asList(jarFiles).forEach(url -> {
			String[] splittedPath = url.getFile().split("/");
			String fileName = splittedPath[splittedPath.length - 1];
			sb.append(" ").append(destination).append(fileName).append(System.lineSeparator());
		});

		return sb.toString();
	}

	public static void copyFiles(URL[] jarFiles, String destination) {
		Arrays.asList(jarFiles).forEach(url -> {
			File file = new File(url.getFile());
			if (!file.isDirectory() && file.exists()) {
				try {
					System.out.println(file.getAbsolutePath());
					Path target = new File(destination + file.getName()).toPath();
					Files.copy(file.toPath(), target, StandardCopyOption.REPLACE_EXISTING);
				} catch (IOException e) {
					System.out.println(file.getAbsolutePath() + " was not copied");
				}
			}
		});
	}

	/**
	 * @param communities
	 */
	private static void printCommunities(CommunityService communityService, List<Community> communities) {
		System.out.println("Count communities: " + communityService.findAll().size());
		communities.forEach(c -> System.out.println(c + " admins: " + c.admins));
	}

	public static List<Community> createCommunities(List<User> users) {
		List<Community> communities = new ArrayList<>(
				Arrays.asList(createCommunity("bla bla bla", users.get(0), new User[] { users.get(1), users.get(2) }),
						createCommunity("Community 1", users.get(3), new User[] { users.get(2) }),
						createCommunity("Deleted Community", users.get(2),
								new User[] { users.get(1), users.get(0), users.get(3) })));

		return communities;
	}

	public static Community createCommunity(String title, User owner, User[] users) {
		Community community = new Community();
		community.title = title;
		community.owner = owner;
		community.admins = new HashSet<User>(Arrays.asList(users));
		return community;
	}

	public static List<PhoneType> getPhoneTypes() {
		List<PhoneType> phoneTypes = new ArrayList<>(
				Arrays.asList(new PhoneType(), new PhoneType(), new PhoneType(), new PhoneType()));
		phoneTypes.get(0).title = "mobile";
		phoneTypes.get(1).title = "home";
		phoneTypes.get(2).title = "work";
		phoneTypes.get(3).title = "deleted";
		return phoneTypes;
	}

	public static List<User> getUsers() {
		List<User> users = new ArrayList<>(Arrays.asList(createUser("first0", "last", "email1", "password"),
				createUser("first1", "last", "email2", "password"), createUser("first2", "last", "email3", "password"),
				createUser("first3", "deleted", "deleted", "password")));
		return users;
	}

	public static User createUser(String firstName, String lastName, String email, String hashPassword) {
		User user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.hashPassword = hashPassword;
		user.admin = false;
		user.blocked = false;
		user.deleted = false;
		return user;
	}

	public static List<PhoneNumber> createPhoneNumbers(List<PhoneType> phoneTypes, List<User> users) {
		List<PhoneNumber> phoneNumbers = new ArrayList<>(
				Arrays.asList(createPhoneNumber("+1", phoneTypes.get(0), users.get(0)),
						createPhoneNumber("+2", phoneTypes.get(2), users.get(0)),
						createPhoneNumber("+3", phoneTypes.get(3), users.get(0)),
						createPhoneNumber("+4", phoneTypes.get(0), users.get(1)),
						createPhoneNumber("+5", phoneTypes.get(1), users.get(1)),
						createPhoneNumber("+6", phoneTypes.get(1), users.get(3)),
						createPhoneNumber("+7", phoneTypes.get(2), users.get(3)),
						createPhoneNumber("+8", phoneTypes.get(3), users.get(3))));
		return phoneNumbers;
	}

	public static PhoneNumber createPhoneNumber(String number, PhoneType phoneType, User user) {
		PhoneNumber phoneNumber = new PhoneNumber();
		phoneNumber.number = number;
		phoneNumber.type = phoneType;
		phoneNumber.user = user;
		return phoneNumber;
	}

	public static <T extends AbstractEntity> void saveEntities(AbstractEntityService<T> service, List<T> entities) {
		entities.forEach(entity -> service.save(entity));
	}
}
