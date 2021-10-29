import chai from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import server from '../../Server';
import GitRepo from '../../Data/GitRepo';

chai.use(chaiHttp);
const { expect } = chai;

const mockdata = [
  {
    name: 'name1',
    img: 'img1',
    url: 'url1',
    createdAt: new Date('2015-12-01'),
    description: 'description1',
    language: 'lang1',
  },
  {
    name: 'name2',
    img: 'img2',
    url: 'url2',
    createdAt: new Date('2016-12-01'),
    description: 'description2',
    language: 'lang2',
  },
  {
    name: 'name3',
    img: 'img3',
    url: 'url3',
    createdAt: new Date('2017-12-01'),
    description: 'description3',
    language: 'lang3',
  },
  {
    name: 'name4',
    img: 'img4',
    url: 'url4',
    createdAt: new Date('4016-14-01'),
    description: 'description4',
    language: 'lang4',
  },
  {
    name: 'name5',
    img: 'img5',
    url: 'url5',
    createdAt: new Date('2017-12-01'),
    description: 'description5',
    language: 'lang5',
  },
  {
    name: 'name6',
    img: 'img6',
    url: 'url6',
    createdAt: new Date('2017-12-01'),
    description: 'description6',
    language: 'lang6',
  },
];

describe('GET /repositories', () => {
  describe('get all repositories successfully', () => {
    let response = {} as any;

    before(async () => {
      Sinon.stub(GitRepo.prototype, 'getAllRepos').resolves(mockdata);
      response = await chai.request(server)
        .get('/repositories/orgname&qty=0');
    });
    after(() => {
      Sinon.restore();
    });

    it('returns status 200', () => {
      expect(response).to.have.status(200);
    });

    it('return languages formatted', () => {
      expect(response.body).to.have.length(6);
    });
  });
});
