import {compareCourses, Course} from '../model/course';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CourseActions} from '../actions-types';


export interface ICoursesState extends EntityState<Course> {
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: compareCourses
// sortComparer: (a: Course, b: Course) => a.seqNo > b.seqNo ? 1 : a.seqNo < b.seqNo ? -1 : 0
});


export const initialState: ICoursesState = adapter.getInitialState({name: 'Udi'});

export const coursesReducer = createReducer<ICoursesState>(
  initialState,
  on(CourseActions.allCoursesLoaded,
    (state: ICoursesState, action) => adapter.addAll(action.courses, state)
  )
);

export const {selectAll} = adapter.getSelectors();
