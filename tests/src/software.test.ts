import { Software } from '../../src/software';

describe('Test class Software', () => {
    it('Test addDependencies and getDependencies methods', () => {
        const softwareTelnet = new Software('TELNET');
        const softwareTcpip = new Software('TCPIP');
        jest.spyOn(softwareTelnet, 'addDependencies');
        jest.spyOn(softwareTelnet, 'getDependencies');

        softwareTelnet.addDependencies(softwareTcpip);
    
        expect(softwareTelnet.getDependencies()).toStrictEqual([softwareTcpip]);
    });

    it('Test toString and getName methods', () => {
        const softwareNetcard = new Software('NETCARD');
        jest.spyOn(softwareNetcard, 'getName');
        jest.spyOn(softwareNetcard, 'toString');

        softwareNetcard.toString();

        expect(softwareNetcard.getName).toHaveBeenCalledTimes(1);
        expect(softwareNetcard.getName()).toStrictEqual('NETCARD');
    });

    it('Test equals method', () => {
        const softwareNetcard = new Software('NETCARD');
        const softwareDns = new Software('DNS');
        jest.spyOn(softwareDns, 'equals');

        expect(softwareDns.equals(softwareDns)).toBe(true);
        expect(softwareDns.equals(softwareNetcard)).toBe(false);
    });

});