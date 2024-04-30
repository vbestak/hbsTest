import {ApiProperty} from "@nestjs/swagger";

export class PageableDto<T>{
    @ApiProperty({type: Object, isArray: true, description: "Array of searched objects"})
    content: T[];
    @ApiProperty({type: Number})
    pageNumber: number;
    @ApiProperty({type: Number})
    pageSize: number

    constructor(pageable: PageableDto<T>) {
        Object.assign(this, pageable);
    }
}