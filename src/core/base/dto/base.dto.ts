import {PartialType} from "@nestjs/mapped-types";

export class CreateBaseDto {}
export class UpdateBaseDto extends PartialType(CreateBaseDto) {}