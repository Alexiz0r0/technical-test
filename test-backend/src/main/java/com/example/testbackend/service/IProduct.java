package com.example.testbackend.service;

import com.example.testbackend.model.entity.Product;

import java.util.List;

public interface IProduct {

    List<Product> listAll();
    Product save(Product product);

    Product findById(Long id);

    void delete(Product product);

}
