(module
	(memory (import "env" "img") 1)
	(func (export "imgToAscii") (param $len i32) (param $width i32) (param $height i32) (result i32)

		(local $ptr i32)
		(local $index i32)
		(local $end i32)

		(local $chunkWidth i32)
		(local $chunkHeight i32)
		(local $sampleOffsetX1 i32)
		(local $sampleOffsetY1 i32)
		(local $sampleOffsetX2 i32)
		(local $sampleOffsetY2 i32)

		(local $rowChunks i32)
		(local $columnChunks i32)
		
		(local $chunkX i32)
		(local $chunkY i32)

		(local $baseX i32)
		(local $baseY i32)

		(local $index1 i32)
		(local $index2 i32)

		(local $avg i32)


		;; The width and height of each chunk
		(local.set $chunkWidth 		(i32.const 15))
		(local.set $chunkHeight 	(i32.const 20))

		;; Optimize the sample offsets for the image
		(local.set $sampleOffsetX1 	(i32.const 4))
		(local.set $sampleOffsetY1 	(i32.const 5))
		(local.set $sampleOffsetX2 	(i32.const 11))
		(local.set $sampleOffsetY2 	(i32.const 15))

		;; Divide image into horizontal chunks
		(local.set $rowChunks
			(i32.div_s
				(local.get $width)
				(local.get $chunkWidth)
			)
		)

		;; Divide image into vertical chunks
		(local.set $columnChunks
			(i32.div_s
				(local.get $height)
				(local.get $chunkHeight)
			)
		)

		;; Initialize the index and pointer
		(local.set $index (i32.const 0))
		(local.set $ptr (i32.const 0))

		;; Calculate the end index
		(local.set $end
			(i32.mul
				(local.get $rowChunks)
				(local.get $columnChunks)
			)
		)

		;; Loop over the array
		(block $break
			(loop $top

				;; Check if we are at the end
				;; i < rowChunks * columnChunks
				(br_if $break
					(i32.ge_s
						(local.get $index)
						(local.get $end)
					)
				)

				;; Get the chunk's position
				(local.set $chunkX
					(i32.div_s
						(local.get $index)
						(local.get $columnChunks)
					)
				)
				(local.set $chunkY
					(i32.rem_s
						(local.get $index)
						(local.get $columnChunks)
					)
				)

				;; Get baseX and baseY
				(local.set $baseX
					(i32.mul
						(local.get $chunkX)
						(local.get $chunkWidth)
					)
				)

				(local.set $baseY
					(i32.mul
						(local.get $chunkY)
						(local.get $chunkHeight)
					)
				)

				;; Get the index of the first pixel in the chunk
				(local.set $index1
					(i32.add
						(i32.mul
							(i32.add
								(local.get $baseY)
								(local.get $sampleOffsetY1)
							)
							(local.get $width)
						)
						(i32.add
							(local.get $baseX)
							(local.get $sampleOffsetX1)
						)
					)
				)
		   
				;; Get the index of the second pixel in the chunk
				(local.set $index2
					(i32.add
						(i32.mul
							(i32.add
								(local.get $baseY)
								(local.get $sampleOffsetY2)
							)
							(local.get $width)
						)
						(i32.add
							(local.get $baseX)
							(local.get $sampleOffsetX2)
						)
					)
				)

				;; Find overage of two pixels
				(local.set $avg
					(i32.and
						(i32.add
							(i32.shr_u
								(i32.and
									(i32.xor
										(i32.load
											(local.get $index1)
										)
										(i32.load
											(local.get $index2)
										)
									)
									(i32.const 0xfefefefe)
								)
								(i32.const 1)
							)
							(i32.and
								(i32.load
									(local.get $index1)
								)
								(i32.load
									(local.get $index2)
								)
							)
						)
						(i32.const 0xff)
					)
				)

				;; Store the average to memory
				(i32.store
					(local.get $ptr)
					(local.get $avg)
				)

				;; Increment the pixel pointer
				(local.set $ptr
					(i32.add
						(local.get $ptr)
						(i32.const 1)
					)
				)

				;; Increment the position
				(local.set $index
					(i32.add
						(local.get $index)
						(i32.const 4)
					)
				)

				;; Continue the loop
				(br $top)
			)
		)

		;; Set last value to the length of pixels
		(i32.store
			(local.get $end)
			(local.get $rowChunks)
		)

		;; Return the pointer
		(local.get $end)
	)
)
