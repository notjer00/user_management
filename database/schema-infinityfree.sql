-- =====================================================
-- User Management System - InfinityFree MySQL Schema
-- Generated from Laravel 13 migrations
-- Import this file via phpMyAdmin before deploying
-- =====================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table: users
-- From: 0001_01_01_000000_create_users_table
--        2025_08_14_170933_add_two_factor_columns_to_users_table
--        2026_09_13_134911_add_role_to_users_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `email_verified_at` timestamp NULL DEFAULT NULL,
    `password` varchar(255) NOT NULL,
    `two_factor_secret` text NULL DEFAULT NULL,
    `two_factor_recovery_codes` text NULL DEFAULT NULL,
    `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
    `role` varchar(255) NOT NULL DEFAULT 'user',
    `remember_token` varchar(100) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: password_reset_tokens
-- From: 0001_01_01_000000_create_users_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
    `email` varchar(255) NOT NULL,
    `token` varchar(255) NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: sessions
-- From: 0001_01_01_000000_create_users_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sessions` (
    `id` varchar(255) NOT NULL,
    `user_id` bigint UNSIGNED NULL DEFAULT NULL,
    `ip_address` varchar(45) NULL DEFAULT NULL,
    `user_agent` text NULL DEFAULT NULL,
    `payload` longtext NOT NULL,
    `last_activity` int NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `sessions_user_id_index` (`user_id`),
    INDEX `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: cache
-- From: 0001_01_01_000001_create_cache_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cache` (
    `key` varchar(255) NOT NULL,
    `value` mediumtext NOT NULL,
    `expiration` bigint NOT NULL,
    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: cache_locks
-- From: 0001_01_01_000001_create_cache_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cache_locks` (
    `key` varchar(255) NOT NULL,
    `owner` varchar(255) NOT NULL,
    `expiration` bigint NOT NULL,
    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: jobs
-- From: 0001_01_01_000002_create_jobs_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobs` (
    `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    `queue` varchar(255) NOT NULL,
    `payload` longtext NOT NULL,
    `attempts` smallint UNSIGNED NOT NULL,
    `reserved_at` int UNSIGNED NULL DEFAULT NULL,
    `available_at` int UNSIGNED NOT NULL,
    `created_at` int UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: job_batches
-- From: 0001_01_01_000002_create_jobs_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `job_batches` (
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `total_jobs` int NOT NULL,
    `pending_jobs` int NOT NULL,
    `failed_jobs` int NOT NULL,
    `failed_job_ids` longtext NOT NULL,
    `options` mediumtext NULL DEFAULT NULL,
    `cancelled_at` int NULL DEFAULT NULL,
    `created_at` int NOT NULL,
    `finished_at` int NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: failed_jobs
-- From: 0001_01_01_000002_create_jobs_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `failed_jobs` (
    `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` varchar(255) NOT NULL,
    `connection` varchar(255) NOT NULL,
    `queue` varchar(255) NOT NULL,
    `payload` longtext NOT NULL,
    `exception` longtext NOT NULL,
    `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
    INDEX `failed_jobs_connection_queue_failed_at_index` (`connection`, `queue`, `failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: passkeys
-- From: 2024_01_01_000000_create_passkeys_table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `passkeys` (
    `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint UNSIGNED NOT NULL,
    `name` varchar(255) NOT NULL,
    `credential_id` varchar(255) NOT NULL,
    `credential` json NOT NULL,
    `last_used_at` timestamp NULL DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `passkeys_credential_id_unique` (`credential_id`),
    INDEX `passkeys_user_id_index` (`user_id`),
    CONSTRAINT `passkeys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed: Admin user
-- Password: password (bcrypt, 12 rounds)
-- CHANGE THIS PASSWORD after first login
-- --------------------------------------------------------
INSERT INTO `users` (`name`, `email`, `password`, `role`, `email_verified_at`, `created_at`, `updated_at`)
VALUES (
    'Admin',
    'admin@example.com',
    '$2y$12$ZWkSpRJnJmxEBzfUG.mY6etJ4H9SbBWK1Lt1WNxLKSUERVNXlDHHW',
    'admin',
    NOW(),
    NOW(),
    NOW()
);

SET FOREIGN_KEY_CHECKS = 1;
