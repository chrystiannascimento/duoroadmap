CREATE DATABASE duoroadmap;

CREATE TABLE theme(
    theme_id SERIAL PRIMARY KEY,
    theme_name VARCHAR(255),
    description VARCHAR
);


CREATE TABLE topic(
    topic_id SERIAL PRIMARY KEY,
    topic_name VARCHAR(255),
    theme_id integer REFERENCES theme(theme_id) ON DELETE CASCADE,
    description VARCHAR
);

CREATE TABLE subtopic(
    subtopic_id SERIAL PRIMARY KEY,
    subtopic_name VARCHAR(255),
    topic_id integer REFERENCES topic(topic_id) ON DELETE CASCADE,
     theme_id integer REFERENCES theme(theme_id) ON DELETE CASCADE,
    description VARCHAR
);

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    subtopic_id integer REFERENCES subtopic(subtopic_id) ON DELETE CASCADE,
    topic_id integer REFERENCES topic(topic_id) ON DELETE CASCADE,
     theme_id integer REFERENCES theme(theme_id) ON DELETE CASCADE,
    description VARCHAR
);
