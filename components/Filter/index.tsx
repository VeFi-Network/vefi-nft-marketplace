import styled from 'styled-components';
type IFilterProps = {
  icon?: any;
  label: string;
  count?: number | string | any;
};
export const FilterPropertyWrapper = styled.div`
  background: #373943;
  width: max-content;

  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  gap: 3px;
  text-transform: capitalize;
  font-size: small;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  .icon {
    font-size: 0.8rem;
    display: flex;
    margin-right: 5px;
  }
  .count {
    margin-left: 5px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    margin-top: 1px;
  }
`;

const FilterProperty = ({ icon, label, count }: IFilterProps) => {
  return (
    <>
      <FilterPropertyWrapper>
        <span className="icon">{icon}</span>
        <span>{label}</span>
        <span className="count">{count}</span>
      </FilterPropertyWrapper>
    </>
  );
};

export default FilterProperty;