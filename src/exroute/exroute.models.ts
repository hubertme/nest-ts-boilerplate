export class SendHelloRequest {
    name: string;

    static fromJson(json: {[key: string]: any}): SendHelloRequest {
        const base = new SendHelloRequest();

        base.name = json['name'];

        return base;
    }
}