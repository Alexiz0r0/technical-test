package com.example.testbackend.controller;

import com.example.testbackend.model.dto.OrderDto;
import com.example.testbackend.model.dto.ResponseOrderDto;
import com.example.testbackend.model.entity.Order;
import com.example.testbackend.service.IOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final IOrder orderService;

    @DeleteMapping("/order/{id}")
    public void delete(@PathVariable Long id){
        Order orderDelete = orderService.findById(id);
        orderService.delete(orderDelete);
    }

    @GetMapping("/order/{id}")
    public Order showById(@PathVariable Long id) {
        return orderService.findById(id);
    }

    @GetMapping("/orders")
    public List<Order> showAll(){
        return orderService.listAll();
    }

    @PostMapping("/add-order")
    public ResponseEntity<ResponseOrderDto> placeOrder(@RequestBody OrderDto orderDto) {
        ResponseOrderDto responseOrderDTO = new ResponseOrderDto();
        float amount = orderService.getCartAmount(orderDto.getCartList());

        Order order = new Order(orderDto.getNumOrder(), orderDto.getCartList(),LocalDate.now(),amount);
        orderService.save(order);

        responseOrderDTO.setFinalPrice(amount);
        responseOrderDTO.setDate(LocalDate.now());
        responseOrderDTO.setCartList(orderDto.getCartList());
        responseOrderDTO.setNumOrder(orderDto.getNumOrder());
        responseOrderDTO.setOrderId(order.getId());
        return ResponseEntity.ok(responseOrderDTO);
    }

    @PutMapping("/update-order/{orderId}")
    public ResponseEntity<ResponseOrderDto> updateOrder(
            @PathVariable Long orderId,
            @RequestBody OrderDto updatedOrderDto
    ) {
        Order existingOrder = orderService.findById(orderId);

        if (existingOrder == null) {
            return ResponseEntity.notFound().build();
        }

        existingOrder.setNumOrder(updatedOrderDto.getNumOrder());
        existingOrder.setCartList(updatedOrderDto.getCartList());
        existingOrder.setFinalPrice(orderService.getCartAmount(updatedOrderDto.getCartList()));
        existingOrder.setDate(LocalDate.now());

        orderService.save(existingOrder);

        ResponseOrderDto responseOrderDto = new ResponseOrderDto();
        responseOrderDto.setFinalPrice(existingOrder.getFinalPrice());
        responseOrderDto.setDate(existingOrder.getDate());
        responseOrderDto.setCartList(existingOrder.getCartList());
        responseOrderDto.setNumOrder(existingOrder.getNumOrder());
        responseOrderDto.setOrderId(existingOrder.getId());

        return ResponseEntity.ok(responseOrderDto);
    }

}
