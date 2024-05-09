(module
	(memory (import "env" "img") 1)
	(func (export "addOneMemory") (param $ptr i32) (param $len i32) (param $width i32) (param $height i32)

		(local $end i32)
		(local.set $end
			(i32.add
				(local.get $ptr)
				(local.get $len)
			)
		) 

		;; Loop over the array
		(block $break
			(loop $top

				;; Check if we are at the end
				(br_if $break
					(i32.eq
						(local.get $ptr)
						(local.get $len)
					)
				)

				;; Add one to the value of the memory
				(i32.store
					(local.get $ptr)
					(i32.add
						(i32.load
							(local.get $ptr)
						)
						(i32.const 1)
					)
				)


				;; Increment the loop
				(local.set $ptr
					(i32.add
						(local.get $ptr)
						(i32.const 1)
					)
				)

				;; Continue the loop
				(br $top)
			)
		)
	)
)
