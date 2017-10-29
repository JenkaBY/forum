CREATE TABLE "users" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"name" varchar(127) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"hash_password" varchar(60) NOT NULL UNIQUE,
	"last_logon_at" TIMESTAMP NOT NULL,
	"blocked" BOOLEAN NOT NULL DEFAULT 'false',
	"rejected" BOOLEAN NOT NULL DEFAULT 'false',
	"approved_by" integer,
	"role_id" integer NOT NULL,
	"image_path" varchar(255),
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "topic_requests" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"requested_by" integer NOT NULL,
	"requested_topic_title" varchar(255) NOT NULL,
	"created_topic_id" integer(255),
	"status" varchar(255) NOT NULL,
	"reason" varchar(255),
	CONSTRAINT topic_requests_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "topics" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"title" varchar(255) NOT NULL UNIQUE,
	"created_by" integer NOT NULL,
	"image_path" varchar(255),
	"description" varchar(500),
	CONSTRAINT topics_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "topic_discuss_requests" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"user_id" integer NOT NULL,
	"approved_by" integer,
	"approved_at" TIMESTAMP,
	"topic_id" integer NOT NULL,
	"status" varchar(10) NOT NULL,
	CONSTRAINT topic_discuss_requests_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "messages" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"text" varchar(5000) NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" TIMESTAMP,
	"updated_by" integer,
	"topic_id" integer NOT NULL,
	CONSTRAINT messages_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "roles" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"title" varchar(10) NOT NULL UNIQUE,
	CONSTRAINT roles_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "topics_users" (
	"topic_id" integer NOT NULL,
	"user_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("approved_by") REFERENCES "users"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("role_id") REFERENCES "roles"("id");

ALTER TABLE "topic_requests" ADD CONSTRAINT "topic_requests_fk0" FOREIGN KEY ("requested_by") REFERENCES "users"("id");
ALTER TABLE "topic_requests" ADD CONSTRAINT "topic_requests_fk1" FOREIGN KEY ("created_topic_id") REFERENCES "topics"("id");

ALTER TABLE "topics" ADD CONSTRAINT "topics_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");

ALTER TABLE "topic_discuss_requests" ADD CONSTRAINT "topic_discuss_requests_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "topic_discuss_requests" ADD CONSTRAINT "topic_discuss_requests_fk1" FOREIGN KEY ("approved_by") REFERENCES "users"("id");
ALTER TABLE "topic_discuss_requests" ADD CONSTRAINT "topic_discuss_requests_fk2" FOREIGN KEY ("topic_id") REFERENCES "topics"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk2" FOREIGN KEY ("topic_id") REFERENCES "topics"("id");


ALTER TABLE "topics_users" ADD CONSTRAINT "topics_users_fk0" FOREIGN KEY ("topic_id") REFERENCES "topics"("id");
ALTER TABLE "topics_users" ADD CONSTRAINT "topics_users_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

