package tn.iset.WiContact;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@OpenAPIDefinition

public class WiContactApplication {

	public static void main(String[] args) {
		SpringApplication.run(WiContactApplication.class, args);
	}

}
