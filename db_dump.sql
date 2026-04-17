CREATE DATABASE IF NOT EXISTS portfoliodb;
USE portfoliodb;

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO admin VALUES (1, 'admin', '$2b$10$MAsXdY1hNJ/zAQpyGCiaa.55w.DnmDtcrJC0HpVhv8zyc3El1wE.e', Fri Apr 17 2026 12:12:17 GMT+0600 (Bangladesh Standard Time));

CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` varchar(50) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO education VALUES (1, '2026 - Present', 'IIT', 'DU (Dhaka University)', 'Focusing on Algorithms, System Architecture, and Advanced Web Engineering.', 1);
INSERT INTO education VALUES (2, '2019 - 2021', 'Higher Secondary Certificate', 'Science Discipline', 'Excellence in Mathematics and Physics foundation.', 0);
INSERT INTO education VALUES (3, '2023-2025', 'HSC', 'DHAKA COLLEGE', 'COLLEGE', 0);

CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `payload` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO message VALUES (1, 'sdfvb', 'aq@gmail.com', 'dsj', Fri Apr 17 2026 11:10:36 GMT+0600 (Bangladesh Standard Time));
INSERT INTO message VALUES (2, 'tanvir', 'tanvirtamim@gmail.com', 'yo yo yo yo ', Fri Apr 17 2026 11:11:10 GMT+0600 (Bangladesh Standard Time));
INSERT INTO message VALUES (3, 'SDFU', 'TO@gmail.com', 'wroibnwdbfv', Fri Apr 17 2026 12:29:00 GMT+0600 (Bangladesh Standard Time));

CREATE TABLE `project` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tags` text NOT NULL,
  `image` varchar(512) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO project VALUES ('1', 'Neon', 'A high-frequency dashboard for real-time digital asset tracking with 0.2ms latency across distributed nodes.', '[\"Full-Stack\",\"Next.js\"]', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvOVaGXuSUfGfgMbTMiGE-Y2_PDN1qlC4yAUckipymnaB3FH2DkZcL7MbuoAWPZ2NwmegyDqCmqwhBnRA_sZh6t10MkgIMha2WYF-wiP40m3ww4ByBdPY_1UbXrSoBFFSG3bDFjB7t2aca42y0wGzHbM281KJPaPEAybuVA3u_ifUWfd73v_GUnKu_v5Fo7br3Lrnbk5glqv2nJ4AQgGP69M7j7yB5A-Y-nV4bgpTLxp1qO7zZGBNSHBhAWtd9Pyki44Xdt-WDzJU', '#', 'Full-Stack', Fri Apr 17 2026 11:07:22 GMT+0600 (Bangladesh Standard Time));
INSERT INTO project VALUES ('13e958e2-6b0e-4b34-a198-ce3b56f5277e', 'DCITC', 'college project for it club', '[\"Full-Stack\",\"Next.js\",\"mysql\"]', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvOVaGXuSUfGfgMbTMiGE-Y2_PDN1qlC4yAUckipymnaB3FH2DkZcL7MbuoAWPZ2NwmegyDqCmqwhBnRA_sZh6t10MkgIMha2WYF-wiP40m3ww4ByBdPY_1UbXrSoBFFSG3bDFjB7t2aca42y0wGzHbM281KJPaPEAybuVA3u_ifUWfd73v_GUnKu_v5Fo7br3Lrnbk5glqv2nJ4AQgGP69M7j7yB5A-Y-nV4bgpTLxp1qO7zZGBNSHBhAWtd9Pyki44Xdt-WDzJU', 'https://dcitc.netlify.app/', 'Full-Stack', Fri Apr 17 2026 12:31:14 GMT+0600 (Bangladesh Standard Time));
INSERT INTO project VALUES ('2', 'Monolith_API', 'Customized architectural API gateway handling 100k+ concurrent requests with integrated GraphQL optimization layers.', '[\"Backend\",\"Node.js\"]', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ1Ez49zUJsFS3USGn_DtquitLWBqCKPGvEZsur7XcM6RFeSDzuoM4P1jw1NjUs7hKRDij0WwzPbGPNGmIXPDTdB7CUVLiXdi2D8cZ6Cr9gTgchvvD0C6wn1qlyhvEl5tz5ySthJ0LzTvpOajAIH4Kq7VWvGuslmvFa72rrclHgDFoEhTdpFQbGFsg6lZFanp-VIVd8mzOqADP3jMv9OWGrk4uIJE_PoER1kkaXoVJ6rTPPAYvWQVHcTtthtrizFCYlwGDbHZnnVs', '#', 'Backend', Fri Apr 17 2026 11:07:22 GMT+0600 (Bangladesh Standard Time));
INSERT INTO project VALUES ('3', 'Prism_Framework', 'A spatial web framework designed for architectural visualization and massive-scale interactive environments.', '[\"Architecture\",\"Three.js\"]', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwnwzLtx1BJQnouXnIsiCSNzl2QdTEPvX3qJjIos7JD6uaHVHoj2tvzZNxyJ7X9dM5GKBP6osDQgEn-sNrMuPydT-CqZUo_OXyzA1sIa_HnDxlSGy4DwELBA6T6DP-Qq1cqKnAn5EESK1DV_xUM0W1YNWl47FlrhLWiaGKhDnjwn3n-DvGFR3yiTws00LMI-9yOVJGwl_Bs4NeVcE1NmZZo9qhbc7A2wf0r6VkRXPxfp-kNnIs5CX8BLyUzsI-WR3ddXOCHgT6Vl4', '#', 'Architecture', Fri Apr 17 2026 11:07:22 GMT+0600 (Bangladesh Standard Time));
INSERT INTO project VALUES ('4', 'Quantum_Vault', 'Secure, encrypted storage solution with biometric authentication and decentralized data sharding.', '[\"Security\",\"React\"]', 'https://picsum.photos/seed/security/800/600', '#', 'Security', Fri Apr 17 2026 11:07:22 GMT+0600 (Bangladesh Standard Time));

CREATE TABLE `review` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO review VALUES ('1', 'Alex Rivera', 'CEO @ TechFlow', 'Kazi delivered a high-performance dashboard that exceeded our expectations. His attention to structural integrity is unmatched.', 'https://picsum.photos/seed/alex/100/100');
INSERT INTO review VALUES ('2', 'Sarah Chen', 'Product Manager @ Innovate', 'The Monolith API is a beast. We handled our peak traffic without a single hiccup. Highly recommended for complex backend work.', 'https://picsum.photos/seed/sarah/100/100');
INSERT INTO review VALUES ('3', 'Marcus Thorne', 'Founder @ SpatialDesign', 'Brilliant execution on the Prism Framework. The architectural visualization is stunning and performant.', 'https://picsum.photos/seed/marcus/100/100');
INSERT INTO review VALUES ('4', 'Elena Rodriguez', 'CTO @ SecureNet', 'Quantum Vault is exactly what we needed. Secure, fast, and the Neobrutalist design makes it stand out.', 'https://picsum.photos/seed/elena/100/100');
INSERT INTO review VALUES ('5', 'David Kim', 'Lead Dev @ CloudScale', 'Working with Kazi was a breeze. He understands the balance between raw efficiency and user experience.', 'https://picsum.photos/seed/david/100/100');

CREATE TABLE `skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO skill VALUES (1, 'React', 'Code');
INSERT INTO skill VALUES (2, 'Next.js', 'Layers');
INSERT INTO skill VALUES (3, 'TypeScript', 'Terminal');
INSERT INTO skill VALUES (4, 'Tailwind', 'Palette');
INSERT INTO skill VALUES (5, 'Node.js', 'Cpu');
INSERT INTO skill VALUES (6, 'Express', 'Settings');
INSERT INTO skill VALUES (7, 'MongoDB', 'Database');
INSERT INTO skill VALUES (8, 'PostgreSQL', 'Database');
INSERT INTO skill VALUES (9, 'Docker', 'Layers');
INSERT INTO skill VALUES (10, 'Git', 'History');
INSERT INTO skill VALUES (11, 'Linux', 'Terminal');
INSERT INTO skill VALUES (12, 'Framer Motion', 'Zap');
INSERT INTO skill VALUES (13, 'D3.js', 'Monitor');
INSERT INTO skill VALUES (14, 'Redux', 'Settings');
INSERT INTO skill VALUES (15, 'GraphQL', 'Layers');
INSERT INTO skill VALUES (16, 'CSS', 'Smartphone');

