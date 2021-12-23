package com.example.ITMOhw3

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class CommentController {
    val commentsList = mutableListOf<CommentModel>()
    @GetMapping("/allComments")
    fun allComments(): MutableList<CommentModel> {
        return commentsList;
    }

    @PostMapping("/addComment")
    fun addComment(@RequestBody comment: CommentModel): ResponseEntity<Any> {
        commentsList.add(CommentModel(comment.author, comment.comment))
        return ResponseEntity(HttpStatus.ACCEPTED)
    }
}