package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class SessionControllerTest {
    @Mock
    private SessionService sessionService;

    @Mock
    private SessionMapper mapper;

    @InjectMocks
    private SessionController sessionController;
    private Session session;

    @Test
    void testFindAll_returnsList() {
        List< Session> sessions = List.of(new Session(), new Session());
        List < SessionDto> dtos = List.of(new SessionDto(), new SessionDto());

        Mockito.when(sessionService.findAll()).thenReturn(sessions);
        Mockito.when(mapper.toDto(sessions)).thenReturn(dtos);

        ResponseEntity<?> response = sessionController.findAll();

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(dtos, response.getBody());
    }

    @Test
    void testFindById_returnsSession() {
        Session session = new Session();
       session.setId(1L);

        SessionDto dto = new SessionDto();
        dto.setId(1L);

        Mockito.when(sessionService.getById(1L)).thenReturn(session);
        Mockito.when(mapper.toDto(session)).thenReturn(dto);

        ResponseEntity<?> response = sessionController.findById("1");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(dto, response.getBody());
    }

    @Test
    void testFindById_notFound() {
        Mockito.when(sessionService.getById(1L)).thenReturn(null);

        ResponseEntity<?> response = sessionController.findById("1");

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testFindById_badRequest() {
        ResponseEntity<?> response = sessionController.findById("abc");

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
