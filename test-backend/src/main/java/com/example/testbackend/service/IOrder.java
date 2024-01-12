package com.example.testbackend.service;

import com.example.testbackend.model.entity.Cart;
import com.example.testbackend.model.entity.Order;

import java.util.List;

public interface IOrder {

    List<Order> listAll();
    Order save(Order order);
    Order findById(Long id);
    void delete(Order order);

    float getCartAmount(List<Cart> cartList);

}
