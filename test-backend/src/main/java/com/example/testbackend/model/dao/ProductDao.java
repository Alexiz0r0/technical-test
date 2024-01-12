package com.example.testbackend.model.dao;

import com.example.testbackend.model.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductDao extends CrudRepository<Product, Long> {
}
