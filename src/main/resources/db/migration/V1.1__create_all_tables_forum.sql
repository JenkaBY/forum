CREATE TABLE "roles"
(
  "id"    BIGSERIAL             NOT NULL,
  "title" CHARACTER VARYING(10) NOT NULL,
  CONSTRAINT "pk_roles" PRIMARY KEY ("id"),
  CONSTRAINT "uk0_roles" UNIQUE ("title")
)
WITH (
OIDS = FALSE
);

CREATE TABLE "statuses"
(
  "id"    BIGSERIAL             NOT NULL,
  "title" CHARACTER VARYING(10) NOT NULL,
  CONSTRAINT "pk_statuses" PRIMARY KEY ("id"),
  CONSTRAINT "uk0_statuses" UNIQUE ("title")
)
WITH (
OIDS = FALSE
);

CREATE TABLE "users"
(
  "id"            BIGSERIAL              NOT NULL,
  "name"          CHARACTER VARYING(127) NOT NULL,
  "email"         CHARACTER VARYING(255) NOT NULL,
  "role_id"       BIGINT                 NOT NULL,
  "hash_password" CHARACTER VARYING(60)  NOT NULL,
  "image_path"    CHARACTER VARYING(255),
  "rejected"      BOOLEAN                NOT NULL DEFAULT FALSE,
  "blocked"       BOOLEAN                NOT NULL DEFAULT FALSE,
  "deleted"       BOOLEAN                NOT NULL DEFAULT FALSE,
  "approved_by"   BIGINT,
  "last_logon_at" TIMESTAMP WITHOUT TIME ZONE,
  "created_at"    TIMESTAMP WITHOUT TIME ZONE,
  "version"       BIGINT                 NOT NULL DEFAULT 0,
  CONSTRAINT "users_pk" PRIMARY KEY ("id"),
  CONSTRAINT "fk0_users" FOREIGN KEY ("approved_by") REFERENCES users ("id"),
  CONSTRAINT "fk1_users" FOREIGN KEY ("role_id") REFERENCES roles ("id"),
  CONSTRAINT "uk0_users" UNIQUE ("name"),
  CONSTRAINT "uk1_users" UNIQUE ("email")
) WITH (
OIDS = FALSE
);

CREATE TABLE "topics"
(
  "id"          BIGSERIAL              NOT NULL,
  "title"       CHARACTER VARYING(255) NOT NULL,
  "description" CHARACTER VARYING(500),
  "image_path"  CHARACTER VARYING(255),
  "created_by"  BIGINT,
  "created_at"  TIMESTAMP WITHOUT TIME ZONE,
  "deleted"     BOOLEAN                NOT NULL DEFAULT FALSE,
  "version"     BIGINT                 NOT NULL DEFAULT 0,
  CONSTRAINT "pk_topics" PRIMARY KEY ("id"),
  CONSTRAINT "fk0_topics" FOREIGN KEY ("created_by") REFERENCES users ("id"),
  CONSTRAINT "uk0_topics" UNIQUE ("title")
)
WITH (
OIDS = FALSE
);

CREATE TABLE "messages"
(
  "id"         BIGSERIAL                NOT NULL,
  "text"       CHARACTER VARYING(10000) NOT NULL,
  "topic_id"   BIGINT                   NOT NULL,
  "created_by" BIGINT,
  "created_at" TIMESTAMP WITHOUT TIME ZONE,
  "updated_by" BIGINT,
  "updated_at" TIMESTAMP WITHOUT TIME ZONE,
  "deleted"    BOOLEAN                  NOT NULL DEFAULT FALSE,
  "version"    BIGINT                   NOT NULL DEFAULT 0,
  CONSTRAINT "pk0_messages" PRIMARY KEY ("id"),
  CONSTRAINT "fk0_messages" FOREIGN KEY ("updated_by") REFERENCES "users" ("id"),
  CONSTRAINT "fk1_messages" FOREIGN KEY ("created_by") REFERENCES "users" ("id"),
  CONSTRAINT "fk2_messages" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id")
)
WITH (
OIDS = FALSE
);

CREATE TABLE "topics_users"
(
  topic_id BIGINT NOT NULL,
  user_id  BIGINT NOT NULL,
  CONSTRAINT "pk_topics_users" PRIMARY KEY (topic_id, user_id),
  CONSTRAINT "fk0_topics_users" FOREIGN KEY (user_id) REFERENCES "users" ("id"),
  CONSTRAINT "fk1_topics_users" FOREIGN KEY (topic_id) REFERENCES "topics" ("id")
)
WITH (
OIDS = FALSE
);

CREATE TABLE "topic_requests"
(
  "id"                          BIGSERIAL              NOT NULL,
  "requested_topic_title"       CHARACTER VARYING(255) NOT NULL,
  "requested_topic_description" CHARACTER VARYING(500),
  "status_id"                   BIGINT                 NOT NULL DEFAULT 1,
  "reason"                      CHARACTER VARYING(500),
  "created_topic_id"            BIGINT,
  "requested_by"                BIGINT                 NOT NULL,
  "created_at"                  TIMESTAMP WITHOUT TIME ZONE,
  "deleted"                     BOOLEAN                NOT NULL DEFAULT FALSE,
  "version"                     BIGINT                 NOT NULL DEFAULT 0,
  CONSTRAINT "pk_topic_requests" PRIMARY KEY ("id"),
  CONSTRAINT "fk0_topic_requests" FOREIGN KEY ("created_topic_id") REFERENCES "topics" ("id"),
  CONSTRAINT "fk1_topic_requests" FOREIGN KEY ("status_id") REFERENCES "statuses" ("id"),
  CONSTRAINT "fk2_topic_requests" FOREIGN KEY ("requested_by") REFERENCES "users" ("id")
)
WITH (
OIDS = FALSE
);

CREATE TABLE "topic_discuss_requests"
(
  "id"           BIGSERIAL NOT NULL,
  "topic_id"     BIGINT,
  "status_id"    BIGINT    NOT NULL DEFAULT 1,
  "requested_by" BIGINT    NOT NULL,
  "created_at"   TIMESTAMP WITHOUT TIME ZONE,
  "approved_by"  BIGINT,
  "approved_at"  TIMESTAMP WITHOUT TIME ZONE,
  "deleted"      BOOLEAN   NOT NULL DEFAULT FALSE,
  "version"      BIGINT    NOT NULL DEFAULT 0,
  CONSTRAINT "pk_topic_discuss_requests" PRIMARY KEY ("id"),
  CONSTRAINT "fk0_topic_discuss_requests" FOREIGN KEY ("requested_by") REFERENCES "users" ("id"),
  CONSTRAINT "fk1_topic_discuss_requests" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id"),
  CONSTRAINT "fk2_topic_discuss_requests" FOREIGN KEY ("approved_by") REFERENCES "users" ("id"),
  CONSTRAINT "fk3_topic_discuss_requests" FOREIGN KEY ("status_id") REFERENCES "statuses" ("id")
)
WITH (
OIDS = FALSE
);