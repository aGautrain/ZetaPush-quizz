import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

import { ServerRoom, ServerMember, ServerJoinRequest, ServerLeaveRequest } from './server.interfaces.service';


export class RoomApi extends Api {
    onListRooms: Observable<Array<ServerRoom>>;
    onJoinRoom: Observable<Array<ServerMember>>;

    listRooms({}) {
        return this.$publish('listRooms', {});
    }

    // For some macros a Promise has more sense

    joinRoom({id}:{id: string}): Promise<ServerJoinRequest> {
        return this.$publish('joinRoom', {id});
    }

    leaveRoom({id}:{id: string}): Promise<ServerLeaveRequest> {
        return this.$publish('leaveRoom', {id});
    }

    createRoom({name, password, delay}:{name: string, password: string, delay: number}): Promise<ServerRoom> {
        return this.$publish('createRoom', {name, password, delay});
    }

    detailRoomMember({userKey}:{userKey: string}): Promise<ServerMember> {
        return this.$publish('detailRoomMember', {userKey});
    }
}

export function RoomApiFactory(client: ZetaPushClient, zone: NgZone): RoomApi {
    return createApi(client, zone, RoomApi) as RoomApi;
}

export const RoomApiProvider = {
    provide: RoomApi,
    useFactory: RoomApiFactory,
    deps: [ ZetaPushClient, NgZone ]
}
