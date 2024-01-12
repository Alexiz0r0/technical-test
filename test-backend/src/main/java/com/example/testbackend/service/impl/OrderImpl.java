package com.example.testbackend.service.impl;

import com.example.testbackend.model.dao.OrderDao;
import com.example.testbackend.model.dao.ProductDao;
import com.example.testbackend.model.entity.Cart;
import com.example.testbackend.model.entity.Order;
import com.example.testbackend.model.entity.Product;
import com.example.testbackend.service.IOrder;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderImpl implements IOrder {

    private final OrderDao orderDao;
    private final ProductDao productDao;

    @Override
    public List<Order> listAll() {
        return (List<Order>) orderDao.findAll();
    }
    @Transactional
    @Override
    public Order save(Order order) {
        return orderDao.save(order);
    }
    @Transactional(readOnly = true)
    @Override
    public Order findById(Long id) {
        return orderDao.findById(id).orElse(null);
    }
    @Transactional
    @Override
    public void delete(Order order) {
        orderDao.delete(order);
    }

    @Transactional
    @Override
    public float getCartAmount(List<Cart> cartList) {

        float totalCartAmount = 0f;
        float singleCartAmount = 0f;
        int availableQuantity = 0;

        for (Cart cart : cartList) {

            Long productId = cart.getProductId();
            Optional<Product> product = productDao.findById(productId);
            if (product.isPresent()) {
                Product product1 = product.get();
                if (product1.getAvailableQty() < cart.getQty()) {
                    singleCartAmount = product1.getPrice() * product1.getAvailableQty();
                    cart.setQty(product1.getAvailableQty());
                } else {
                    singleCartAmount = cart.getQty() * product1.getPrice();
                    availableQuantity = product1.getAvailableQty() - cart.getQty();
                }
                totalCartAmount = totalCartAmount + singleCartAmount;
                product1.setAvailableQty(availableQuantity);
                availableQuantity=0;
                cart.setProductName(product1.getName());
                cart.setTotalPrice(singleCartAmount);
                productDao.save(product1);
            }
        }
        return totalCartAmount;
    }
}
