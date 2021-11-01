import { index, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';


export enum TopLevelCategory{
	Courses,
	Services,
	Books,
	Products
}

export class HhData{
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvatage{
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base {}

@index({ '$**': 'text'})
export class TopPageModel extends TimeStamps {

	@prop({enum: TopLevelCategory})
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({unique: true})
	alias: string;

	@prop({type: () => HhData})
	hh?: HhData;

	@prop({type: () => [TopPageAdvatage]})
	advantages: TopPageAdvatage[];

	@prop()
	seoText: string;

	@prop({type: () => [String]})
	tags: string[];

	@prop()
	tagsTitle: string;
}
