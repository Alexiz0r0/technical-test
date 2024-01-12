package com.example.testbackend.controller;


import com.example.testbackend.model.entity.Product;
import com.example.testbackend.service.IProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final IProduct productService;

    @PostMapping("/product")
    public Product create(@RequestBody Product product){
        return productService.save(product);
    }

    @PutMapping("/product")
    public Product update(@RequestBody Product product){
        return productService.save(product);
    }

    @DeleteMapping("/product/{id}")
    public void delete(@PathVariable Long id){
        Product productDelete = productService.findById(id);
        productService.delete(productDelete);
    }

    @GetMapping("/product/{id}")
    public Product showById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/products")
    public List<Product> showAll(){
        return productService.listAll();
    }
}
