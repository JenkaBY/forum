package by.intexsoft.forum.constant;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * Class with constants acceptable ContentType in requests
 */
public class ContentType {
    public static final Set<String> IMAGE =
            Collections.unmodifiableSet(
                    new HashSet<>(Arrays.asList("image/gif", "image/png", "image/jpeg", "image/bmp")));
}
