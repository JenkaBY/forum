package by.intexsoft.userfaces;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;

public class MainRunner2 {

	public static void main(String[] args) {
		printClassPath();
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

	
	public static void copyFiles(URL[] jarFiles, String destination) {
		Arrays.asList(jarFiles).forEach(url -> {
			File file = new File(url.getFile());
			if (!file.isDirectory() && file.exists()) {
				try {
					System.out.println(file.getAbsolutePath());
					Path target =  new File(destination + file.getName()).toPath();
					Files.copy(file.toPath(),target, StandardCopyOption.REPLACE_EXISTING);
				} catch (IOException e) {
					System.out.println(file.getAbsolutePath() + " was not copied");
				}
			}
		});
	}
}
