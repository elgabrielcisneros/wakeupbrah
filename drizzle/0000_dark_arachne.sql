CREATE TABLE `alarm_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`time` text NOT NULL,
	`repeating` integer NOT NULL,
	`repeating_pattern` text NOT NULL,
	`challenge` text NOT NULL,
	`day` text NOT NULL,
	`status` integer NOT NULL
);
