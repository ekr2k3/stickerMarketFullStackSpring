# stickerMarketFullStackSpring
This is demo for digital item market, User ReactJS and Spring Boot


> Change branch main to marter to get source code


In SQL been Had

INSERT INTO customers (name, email, mobile_number, password_hash, created_at, created_by, updated_at, updated_by)
VALUES ('studentA@gmail.com', 'studentA@gmail.com', '123', '$2a$10$pVpXy6oGojaEfdqfP.o2vO1qIwzi4ZETCxr/yX/Rz5cmi4IKTK6iW', null, null, null, null);


INSERT INTO customers (name, email, mobile_number, password_hash, created_at, created_by, updated_at, updated_by)
VALUES ('Admin@gmail.com', 'Admin@gmail.com', '124', '$2a$10$pVpXy6oGojaEfdqfP.o2vO1qIwzi4ZETCxr/yX/Rz5cmi4IKTK6iW', null, null, null, null);

Mật khẩu đều là `123`

for

                                .authorizeHttpRequests(auth -> auth.requestMatchers(
                                        "/api/v1/auth/**",
                                        "/api/v1/contacts/**",
                                        "/api/v1/products/**",
                                        "/h2-console/**",
                                        "/error"
                                ).permitAll().requestMatchers(
                                                "/api/v1/admin/**"
                                        ).hasRole("ADMIN").anyRequest().hasAnyRole("USER", "ADMIN"))
