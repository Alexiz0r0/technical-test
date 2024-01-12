package com.example.testbackend.model.dao;

import com.example.testbackend.model.entity.Cart;
import org.springframework.data.repository.CrudRepository;

public interface CartDao extends CrudRepository<Cart, Long> {
}
