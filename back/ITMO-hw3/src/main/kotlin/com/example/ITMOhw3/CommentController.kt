package com.example.ITMOhw3

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class CommentController {

    @GetMapping("/allComments")
    fun allComments(): MutableList<CommentModel> {
        // ... //
        return mutableListOf()
    }

    @PostMapping("/addComment")
    fun addComment(@RequestBody comment: CommentModel): ResponseEntity<Any> {
        // ... //
        return ResponseEntity(HttpStatus.ACCEPTED)
    }
}