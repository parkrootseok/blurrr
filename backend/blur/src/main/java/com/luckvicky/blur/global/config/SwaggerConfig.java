package com.luckvicky.blur.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi noAuthApi() {
        // "/v1/**" 경로에 매칭되는 API를 그룹화하여 문서화한다.
        String[] noAuthPaths = {"/v1/auth/**"};

        return GroupedOpenApi.builder()
                .group("no auth")  // 그룹 이름을 설정한다.
                .pathsToMatch(noAuthPaths)     // 그룹에 속하는 경로 패턴을 지정한다.
                .build();
    }

    @Bean
    public GroupedOpenApi authApi() {
        String[] authPaths = {"/spots/**", "/v1/leagues/**", "/v1/boards/**","/channels/**", "/v1/members/**"};
        return GroupedOpenApi.builder()
                .group("auth")
                .pathsToMatch(authPaths)
                .addOpenApiCustomizer(openApi -> openApi
                        .addSecurityItem(new SecurityRequirement().addList("bearerAuth")))
                .build();
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("Bearer")
                                        .bearerFormat("JWT")));
    }

    private Info apiInfo() {
        return new Info()
                .title("블러 API")
                .description("블러 OpenAPI")
                .version("v1");
    }
}
